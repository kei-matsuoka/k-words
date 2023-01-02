import { useEffect } from "react";
import { Link } from "react-router-dom"

export const Privacy = ({ setTitle }) => {
  useEffect(() => {
    setTitle("プライバシーポリシー");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-white px-8 py-6 -m-4">
      <p className="p">霞が関用語辞典運営（以下、「運営」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）におけるユーザーの情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。</p>

      <h2 className="h2">第1条 取得する情報及び利用方法</h2>
      <p className="p">運営は本サービスにおいて次のように情報を取得及び利用いたします。</p>

      <h3 className="h3">ご登録いただいた情報</h3>
      <ul className="ul">
        <li className="li">メールアドレス</li>
      </ul>
      <p className="p2">ユーザーとの連絡。お知らせの送付。ログイン時のユーザーの識別。</p>
      <h3 className="h3">サービス利用時に取得する情報</h3>
      <ul className="ul">
        <li className="li">サーバーログ</li>
        <li className="li">IPアドレス</li>
        <li className="li">ホスト名</li>
        <li className="li">ブラウザの種類</li>
        <li className="li">ブラウザの言語</li>
        <li className="li">機器情報</li>
        <li className="li">端末の個体識別情報</li>
      </ul>
      <p className="p2">不正行為の防止。サービス利用状況の分析。不具合発生時の問題分析。</p>
      <ul className="ul">
        <li className="li">Cookie</li>
      </ul>
      <p className="p2">セッション・ログイン状態の保持。設定情報の保持。サービス利用状況の分析。</p>


      <h2 className="h2">第2条 取得した情報の外部利用</h2>
      <p className="p">取得した情報は本サービス内のみで利用し、外部に提供することはございません。</p>

      <h2 className="h2">第3条 取得した情報の第三者提供</h2>
      <p className="p">法令に基づく場合を除き、第三者に提供することはございません。</p>

      <h2 className="h2">第4条 取得した情報の削除</h2>
      <p className="p">ユーザーは所定の手続きを行うことによって、運営が取得した情報を削除することが可能です。削除を希望する場合は、<Link to={"/contact"} className="text-sky-600">お問い合わせ</Link>ページより削除希望の旨をご連絡ください。個別に対応いたします。</p>

      <h2 className="h2">第5条 個人情報の取り扱い</h2>
      <p className="p">当サービスでは、本名、正確な住所、電話番号、性別、生年月日といった個人を特定できる情報は取り扱っておりません。ただし、ユーザーご自身で公開情報に本名等の個人情報をご登録された場合は、ご自身で公開されたとみなし、運営は一切の責任を負いません。</p>

      <h2 className="h2">第6条 本ポリシーの改定</h2>
      <p className="p">本ポリシーは改定されることがあります。改定した際にはユーザーの皆さまにお知らせいたします。</p>
    </div>
  )
};
