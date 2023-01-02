import { useEffect } from "react";
import { Link } from "react-router-dom"

export const Policy = ({ setTitle }) => {
  useEffect(() => {
    setTitle("利用規約");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-white px-8 py-6 -m-4">
      <p className="p">この利用規約（以下、「本規約」といいます。）は、霞が関用語辞典運営（以下、「運営」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、サービスをご利用いただきます。また、個人情報などの取り扱いについて<Link to={"/privacy"} className="text-sky-600">プライバシーポリシー</Link>にまとめておりますので、併せてご確認ください。</p>
      <p className="p">この規約は令和4年1月1日の制定時から有効となります。</p>

      <h2 className="h2">第１条（適用）</h2>
      <p className="p">本規約は、ユーザーと運営との間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>

      <h2 className="h2">第２条（利用登録）</h2>
      <ul className="ul">
        <li className="li">登録希望者が運営の定める方法によって利用登録を申請し、運営がこれを承認することによって、利用登録が完了するものとします。</li>
        <li className="li">運営は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
          <ul className="ul">
            <li className="li">（1）利用登録の申請に際して虚偽の事項を届け出た場合</li>
            <li className="li">（2）本規約に違反したことがある者からの申請である場合</li>
            <li className="li">（3）その他、運営が利用登録を相当でないと判断した場合</li>
          </ul>
        </li>
      </ul>

      <h2 className="h2">第３条（パスワードの管理）</h2>
      <ul className="ul">
        <li className="li">ユーザーは、自己の責任において、本サービスのパスワードを管理するものとします。</li>
        <li className="li">ユーザーは、いかなる場合にも、パスワードを第三者に譲渡または貸与することはできません。運営は、パスワードが登録情報と一致してログインされた場合には、そのユーザーを登録しているユーザー自身による利用とみなします。</li>
      </ul>

      <h2 className="h2">第４条（禁止事項）</h2>
      <p className="p">ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
      <ul className="ul">
        <li className="li">法令または公序良俗に違反する行為</li>
        <li className="li">犯罪行為に関連する行為</li>
        <li className="li">運営のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
        <li className="li">運営のサービスの運営を妨害するおそれのある行為</li>
        <li className="li">他のユーザーに関する個人情報等を収集または蓄積する行為</li>
        <li className="li">他のユーザーに成りすます行為</li>
        <li className="li">運営のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
        <li className="li">その他、運営が不適切と判断する行為</li>
      </ul>

      <h2 className="h2">第５条（本サービスの提供の停止等）</h2>
      <ul className="ul">
        <li className="li">運営は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
          <ul className="ul">
            <li className="li">（1）本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
            <li className="li">（2）地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
            <li className="li">（3）コンピュータまたは通信回線等が事故により停止した場合</li>
            <li className="li">（4）運営が死亡、またはサービスの管理が困難となった場合。</li>
            <li className="li">（5）その他、運営が本サービスの提供が困難と判断した場合</li>
          </ul>
        </li>
        <li className="li">運営は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害について、理由を問わず一切の責任を負わないものとします。</li>
      </ul>

      <h2 className="h2">第６条（利用制限および登録抹消）</h2>
      <ul className="ul">
        <li className="li">運営は、以下の場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
          <ul className="ul">
            <li className="li">（1）本規約のいずれかの条項に違反した場合</li>
            <li className="li">（2）登録事項に虚偽の事実があることが判明した場合</li>
            <li className="li">（3）その他、運営が本サービスの利用を適当でないと判断した場合</li>
          </ul>
        </li>
        <li className="li">運営は、本条に基づき運営が行った行為によりユーザーに生じた損害について、一切の責任を負いません。</li>
      </ul>

      <h2 className="h2">第７条（免責事項）</h2>
      <ul className="ul">
        <li className="li">運営の債務不履行責任は、運営の故意または重過失によらない場合には免責されるものとします。</li>
        <li className="li">運営は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。</li>
      </ul>

      <h2 className="h2">第８条（サービス内容の変更等）</h2>
      <p className="p">運営は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。</p>

      <h2 className="h2">第９条（利用規約の変更）</h2>
      <p className="p">運営は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。</p>

      <h2 className="h2">第１０条（通知または連絡）</h2>
      <p className="p">ユーザーと運営との間の通知または連絡は、運営の定める方法によって行うものとします。</p>

      <h2 className="h2">第１１条（権利義務の譲渡の禁止）</h2>
      <p className="p">ユーザーは、運営の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。</p>

      <h2 className="h2">第１２条（準拠法・裁判管轄）</h2>
      <p className="p">本規約の解釈にあたっては、日本法を準拠法とします。また、本サービスに関して紛争が生じた場合には、運営の在住地を管轄する裁判所を専属的合意管轄とします。</p>

      <ul className="ul">
        <li className="li">個人情報を含むもの</li>
        <li className="li">過度に暴力的な表現</li>
        <li className="li">露骨な性的表現</li>
        <li className="li">人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現</li>
        <li className="li">自殺、自傷行為、薬物乱用を誘引または助長する表現</li>
        <li className="li">その他反社会的な内容を含み他人に不快感を与える表現</li>
        <li className="li">自他にかかわらず個人情報が含まれるもの</li>
        <li className="li">営業、宣伝、広告、勧誘、その他営利を目的とするもの</li>
        <li className="li">他のユーザーに対する嫌がらせや誹謗中傷を目的とするもの</li>
        <li className="li">運営、他のユーザー、または第三者に不利益、損害または不快感を与えることを目的とするもの</li>
        <li className="li">その他本サービスが予定している利用目的と異なる目的のもの</li>
        <li className="li">その他運営が不適切と判断するもの</li>
      </ul>

      <h2 className="h2">第１３条（権利の侵害等の対応）</h2>
      <p className="p">基本的に他人の著作権などの権利を侵害するような単語カード、文章などの投稿は禁止します。</p>
      <p className="p">万が一、権利を侵害しているようなコンテンツが存在する場合は、お手数ですが、そのコンテンツの権利所有者の方がお問い合わせフォームより運営までご報告ください。</p>
    </div>
  )
};
