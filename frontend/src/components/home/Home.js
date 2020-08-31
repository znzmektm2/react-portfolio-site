import React, { useEffect } from "react";
import "./home.scss";
import { TimelineMax } from "gsap";

const Home = ({ designNumber, portfolioNumber }) => {
  useEffect(() => {
    const header = document.getElementsByTagName("header")[0];
    header.classList.add("home");

    // SVG 애니메이션
    const tl = new TimelineMax();
    setTimeout(() => {
      tl.to("#svg path", 2.5, {
        strokeDashoffset: 0,
      });
      tl.to("#svg path", 2.5, { "fill-opacity": 1, "stroke-opacity": 0 });
    }, 1000);

    const p1 = ["leo", "kiki", "eden"];
    const c1 = ["eden", "kiki"];

    const p2 = ["marina", "josipa", "nikola", "vinko", "filipa"];
    const c2 = ["josipa", "filipa", "marina", "nikola"];

    const p3 = ["mislav", "stanko", "mislav", "ana"];
    const c3 = ["stanko", "ana", "mislav"];

    /////////////////

    function solution(p, c) {
      for (let j = 0; j < c.length; j++) {
        console.log(c, c[j]);
        for (let i = 0; i < p.length; i++) {
          console.log(c[j], p[i]);
          if (p[i] === c[j]) {
            p.splice(p.indexOf(c[j]), 1);
            c.splice(c.indexOf(c[j]), 1);
            console.log(2, p);
            break;
          }
        }
      }

      console.log(1, p);

      return p[0];
    }

    console.log(solution(p2, c2));

    /////////////////////////

    return () => {
      header.classList.remove("home");
    };
  }, []);

  return (
    <div className="homeBlock">
      <div className="textWrap">
        <h2>
          <svg id="svg" viewBox="1.5 -4.5 621 519">
            <g>
              <linearGradient
                id="SVGID_1_"
                gradientUnits="userSpaceOnUse"
                x1="425.7871"
                y1="480.9084"
                x2="425.7871"
                y2="-9.7811"
                gradientTransform="matrix(1 0 0 -1 59.0098 493.4009)"
              >
                <stop offset="0" style={{ stopColor: "#FF2F00" }} />
                <stop offset="0.3333" style={{ stopColor: "#ED0201" }} />
                <stop offset="0.6666" style={{ stopColor: "#FD0C68" }} />
                <stop offset="1" style={{ stopColor: "#CB018F" }} />
              </linearGradient>
              <path
                fill="url(#SVGID_1_)"
                d="M600.902,493.497c-5.399-0.693-10.228-3.129-14.486-7.299c-5.398-5.281-10.373-12.653-14.913-22.108
		c-4.546-9.451-8.947-19.324-13.209-29.615c-4.261-10.285-8.666-20.294-13.206-30.03c-4.548-9.73-9.521-17.657-14.913-23.775
		c-8.521-8.896-17.47-14.737-26.843-17.517c21.869-4.172,38.699-12.933,50.49-26.279c11.783-13.346,17.682-30.45,17.682-51.303
		c0-25.026-8.521-44.63-25.564-58.813c-17.043-14.18-40.902-21.272-71.58-21.272h-43.885h-48.998h-29.4v2.504
		c3.123,0,5.68,0.977,7.669,2.92c1.983,1.947,2.981,4.452,2.981,7.506v10.426v159.337v38.789v36.288v21.271
		c0,3.063-0.998,5.568-2.981,7.508c-1.989,1.951-4.548,2.921-7.669,2.921v2.503h59.226h29.824v-2.503
		c-3.128,0-5.687-0.97-7.669-2.921c-1.99-1.938-2.982-4.443-2.982-7.508v-21.271v-30.032v-43.795v-23.355
		c9.654,0.279,16.83,4.032,21.518,11.262c4.688,7.233,8.662,16.201,11.931,26.903c3.261,10.707,6.458,22.178,9.585,34.409
		c3.125,12.24,7.811,23.639,14.061,34.202c6.248,10.57,14.979,19.397,26.205,26.487c11.217,7.093,26.344,10.636,45.377,10.636
		c7.668,0,14.766-0.695,21.304-2.086c6.532-1.391,12.282-3.127,17.256-5.213c4.966-2.086,9.161-4.245,12.569-6.466
		c3.408-2.222,5.818-4.169,7.24-5.838l-1.703-1.668C611.268,492.599,606.295,494.195,600.902,493.497z M486.717,346.673
		c-4.833,5.982-10.013,10.289-15.55,12.931c-5.54,2.644-10.728,3.96-15.554,3.96h-25.14v-93.846v-26.28v-14.599v-10.426
		c0-3.054,0.992-5.561,2.983-7.506c1.982-1.943,4.54-2.92,7.668-2.92h4.261h11.931h2.557c4.826,0,9.798,1.252,14.91,3.755
		c5.115,2.501,9.801,6.815,14.062,12.93c4.261,6.121,7.81,14.116,10.65,23.983c2.838,9.874,4.262,22.179,4.264,36.913
		c0,14.74-1.637,27.11-4.899,37.12C495.593,332.7,491.544,340.697,486.717,346.673z"
              />
              <linearGradient
                id="SVGID_2_"
                gradientUnits="userSpaceOnUse"
                x1="220.6548"
                y1="480.9075"
                x2="220.6548"
                y2="-9.78"
                gradientTransform="matrix(1 0 0 -1 59.0098 493.4009)"
              >
                <stop offset="0" style={{ stopColor: "#FF2F00" }} />
                <stop offset="0.3333" style={{ stopColor: "#ED0201" }} />
                <stop offset="0.6666" style={{ stopColor: "#FD0C68" }} />
                <stop offset="1" style={{ stopColor: "#CB018F" }} />
              </linearGradient>
              <path
                fill="url(#SVGID_2_)"
                d="M362.742,2.531V0.029h-6.834H273.47v2.503c3.129,0,5.693,0.978,7.688,2.92
		c1.988,1.95,2.99,4.452,2.99,7.508v210.222c0,8.623-0.281,16.827-0.836,24.608c-0.56,7.788-1.533,14.671-2.929,20.648
		c-1.396,5.98-3.345,10.776-5.847,14.389c-2.512,3.619-5.713,5.565-9.611,5.842c-5.699,0.56-10.251-0.9-13.668-4.383
		c-3.416-3.473-5.413-6.737-5.979-9.799c-0.574-3.058-0.426-6.257,0.428-9.595c0.854-3.337,3.416-6.948,7.688-10.846
		c7.401-6.392,11.106-14.455,11.106-24.19c0-9.179-3.297-16.959-9.892-23.358c-6.594-6.396-14.617-9.593-24.065-9.593
		c-9.458,0-17.479,3.198-24.074,9.593c-6.594,6.398-9.884,14.18-9.884,23.358c0,8.622,1.988,16.685,5.98,24.19
		c3.983,7.509,9.537,14.117,16.657,19.813c7.115,5.702,15.378,10.151,24.775,13.346c9.396,3.201,19.501,4.798,30.325,4.798
		c10.531,0,20.57-1.945,30.113-5.839c9.535-3.894,17.791-9.106,24.772-15.644c6.976-6.528,12.526-13.9,16.659-22.106
		c4.123-8.198,6.193-16.614,6.193-25.236h0.002V24.636V12.957c0-3.056,0.993-5.559,2.988-7.508
		C357.043,3.51,359.605,2.531,362.742,2.531z"
              />
              <linearGradient
                id="SVGID_3_"
                gradientUnits="userSpaceOnUse"
                x1="68.0493"
                y1="480.9397"
                x2="68.0493"
                y2="-9.7494"
                gradientTransform="matrix(1 0 0 -1 59.0098 493.4009)"
              >
                <stop offset="0" style={{ stopColor: "#FF2F00" }} />
                <stop offset="0.3333" style={{ stopColor: "#ED0201" }} />
                <stop offset="0.6666" style={{ stopColor: "#FD0C68" }} />
                <stop offset="1" style={{ stopColor: "#CB018F" }} />
              </linearGradient>
              <path
                fill="url(#SVGID_3_)"
                d="M236.559,354.056l-97.57-281.963L62.722,291.907h-0.426v0.834l-11.08,32.117
		c-1.703,4.73-3.979,9.318-6.815,13.765c-2.843,4.45-6.179,8.412-10.013,11.887c-3.836,3.479-8.096,6.255-12.782,8.341
		c-4.687,2.085-9.732,3.13-15.125,3.13v2.083h76.268v-2.083c-8.242,0-15.272-2.92-21.092-8.759
		c-5.824-5.838-8.733-12.789-8.733-20.854c0-3.058,0.426-6.114,1.276-9.18l10.227-28.777h86.919l20.451,58.395
		c0,0.561,0.065,0.979,0.213,1.25c0.14,0.281,0.214,0.698,0.214,1.251c0,1.67-0.641,3.2-1.918,4.589
		c-1.279,1.396-2.917,2.086-4.9,2.086v2.083h82.232v-2.083C242.236,361.982,238.544,359.341,236.559,354.056z M64.854,291.907
		l43.032-123.463l42.608,123.463H64.854z"
              />
            </g>
          </svg>
        </h2>
        <div className="pTxt">
          <p>
            <span className="strong">I’M A FRONTEND DEVELOPER </span>from Korea
            living in Yongin-si.
            <br />
            I create and build websites to communicate a feeling of joy and
            comfort.
            <br />
            For me, that means that the frontend development like HTML &amp;
            Scss, JS, and <br className="br" />
            WordPress is a part of my field of activity.
            <br />
            If you want to know more about me, feel free to contact me.
          </p>
        </div>
      </div>
      <ul>
        <li>PORTFOLIOS → {portfolioNumber ? portfolioNumber : ""}</li>
        <li>DESIGN → {designNumber ? designNumber : ""}</li>
        <li>LAST UPDATE → AUGUST 2020</li>
      </ul>
      <div className="update">
        <span>LAST UPDATE:</span>
        <span>&nbsp;AUGUST 2020</span>
      </div>
    </div>
  );
};

export default Home;
