import React from "react";
import PageTitle from "./../components/common/PageTitle";

const WritePage = () => {
  return (
    <>
      <PageTitle>Write</PageTitle>
      <div>
        <input type="text" name="id" placeholder="id" />
        <br />
        <input type="text" name="client" placeholder="client" />
        <br />
        <input type="text" name="host" placeholder="host" />
        <br />
        <input type="radio" name="type" value="web" />
        <label htmlFor="web">web</label>
        <input type="radio" name="type" value="singlePage" />
        <label htmlFor="singlePage">singlePage</label>
        <br />
        <input type="checkbox" name="version" value="pcVer" />
        <label htmlFor="pcVer">pcVer</label>
        <input type="checkbox" name="version" value="mobileVer" />
        <label htmlFor="mobileVer">mobileVer</label>
        <br />
        <input type="checkbox" name="responsiveWeb" value="responsiveWeb" />
        <label htmlFor="responsiveWeb">responsiveWeb</label>
        <br />
        <input type="text" name="IEVersion" placeholder="IEVersion" />
        <br />
        <input type="text" name="skill" placeholder="skill" />
        <br />
        <input type="text" name="animationEvent" placeholder="animationEvent" />
        <br />
        <input type="text" name="workYear" placeholder="workYear" />
        <br />
        <input type="text" name="workMonth" placeholder="workMonth" />
        <br />
        <input type="text" name="period" placeholder="period" />
        <br />
        <input type="text" name="worker" placeholder="worker" />
        <br />
        <input type="text" name="url" placeholder="url" />
        <br />
        <input type="file" name="thumbImage" />
        <br />
        <input type="file" name="contentImage" />
        <br />
        <button type="submit">보내기</button>
      </div>
    </>
  );
};

export default WritePage;
