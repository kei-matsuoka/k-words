import { useEffect } from "react";
import { Link } from "react-router-dom"
import { setPageTitle } from "../../helper";

export const About = ({ setTitle }) => {
  useEffect(() => {
    setTitle("運営情報");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-white px-8 py-6 -m-4">

      <h2 className="h2">運営者</h2>
      <p className="p">松岡 慧 / kei Matsuoka</p>

      <h2 className="h2">SNS</h2>
      <p className="p"><a className="text-sky-600" target="_blank" href="https://twitter.com/keimatsuoka" rel="noreferrer">Twitter</a></p>

      <h2 className="h2">お問い合わせ先</h2>
      <p className="p"><Link to={"/contact"} className="text-sky-600">お問い合わせ</Link>ページよりご連絡ください。</p>

    </div>
  )
};
