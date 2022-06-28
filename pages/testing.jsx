let peer, call, stream, conn;
let model, webcam, maxPredictions;
import Script from "next/script";
import { useRef, useEffect, useState, useCallback } from "react";
import styles from "./testing.module.css";

const Home = () => {
  const myVideo = useRef();
  const yourVideo = useRef();
  const [youReady, setYouReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const init = useCallback(
    // Load the image model
    async () => {
      // the link to your model provided by Teachable Machine export panel
      const URL = "https://teachablemachine.withgoogle.com/models/Yv5uRMRpn/";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      webcam = document.getElementById("publisher");
    },
    []
  );

  function ready() {
    console.log(youReady);
    if (youReady) {
      if (playing) return;
      console.log("start game");
      conn.send({ type: "time", startAt: new Date().getTime() + 1000 });
      setTimeout(() => gameStart(), 1000);
    } else {
      console.log("send ready");
      conn.send({ type: "ready" });
    }
  }

  async function createPeerObj(e) {
    if (e.key === "Enter") {
      console.log("create peer obj");
      init();
      peer = new Peer(e.target.value);
      peer.on("open", function (id) {
        console.log("My peer ID is: " + id);
      });
      peer.on("connection", function (connData) {
        conn = connData;
        conn.on("open", function () {
          console.log("conn open");
          conn.on("data", function (data) {
            console.log("conn data");
            if (data.type === "ready") {
              setYouReady(true);
            } else {
              setTimeout(() => gameStart(), data.startAt - Date.now());
            }
          });
        });
      });
      peer.on("call", async function (callData) {
        // Answer the call, providing our mediaStream
        call = callData;
        call.on("stream", function (stream) {
          yourVideo.current.srcObject = stream;
        });
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
          myVideo.current.srcObject = stream;
          call.answer(stream);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  async function callPeer(e) {
    if (e.key === "Enter") {
      console.log("call and connect peer");
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        myVideo.current.srcObject = stream;
        call = peer.call(e.target.value, stream);
        call.on("stream", function (stream) {
          yourVideo.current.srcObject = stream;
        });
        conn = peer.connect(e.target.value);
        conn.on("open", function () {
          console.log("conn open");
          conn.on("data", function (data) {
            console.log("conn data");
            if (data.type === "ready") {
              setYouReady(true);
            } else {
              setTimeout(
                gameStart.then(checkScissorsRockPaper()),
                data.startAt - Date.now()
              );
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function checkScissorsRockPaper() {
    const start = Date.now();
    const accumulated = [0, 0, 0];
    while (Date.now() - start < 1500) {
      const temp = await predict();
      for (let i = 0; i < 3; i++) {
        accumulated[i] += parseFloat(temp[i]);
      }
    }
    console.log(accumulated);
    setYouReady(false);
    setPlaying(false);
  }

  // run the webcam image through the image model
  async function predict() {
    const prediction = await model.predict(webcam);
    return prediction.map((p) => p.probability.toFixed(2));
  }

  async function gameStart() {
    setPlaying(true);
    const countdown = document.getElementById("countdown");
    let count = 3;

    return await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (count === 0) {
          resolve();
          clearInterval(interval);
        } else {
          countdown.innerText = count--;
        }
      }, 1000);
    });
  }

  return (
    <>
      <Script
        src="https://unpkg.com/peerjs@1.3.2/dist/peerjs.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"
        strategy="beforeInteractive"
      />
      <label htmlFor="yourId">
        사용하실 아이디를 입력 후 Enter를 입력해주세요
      </label>
      <input placeholder="your id" id="yourId" onKeyDown={createPeerObj} />
      <br />
      <label htmlFor="peerId">
        상대의 아이디를 입력 후 Enter를 입력해주세요
      </label>
      <input placeholder="peer id to call" id="peerId" onKeyDown={callPeer} />
      <br />
      <label htmlFor="readtBtn">준비가 되었으면 버튼을 눌러주세요</label>
      <button onClick={ready} id="readyBtn">
        ready
      </button>
      <div className={styles.videoBox}>
        <video ref={myVideo} autoPlay id="publisher" className={styles.video} />
        <video ref={yourVideo} autoPlay className={styles.video} />
      </div>
      <h1 id="countdown"></h1>
    </>
  );
};

export default Home;
