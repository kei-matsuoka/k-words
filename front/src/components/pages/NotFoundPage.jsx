import { useEffect } from "react";
import { Link } from "react-router-dom"

export const NotFoundPage = ({ setTitle }) => {
  useEffect(() => {
    setTitle("ページが見つかりません");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex-center bg-white p-8 -m-4">
      <p className="text-sm mt-4">お探しのページは存在しないか、移動または削除された可能性があります。</p>
      <div className="mt-8 mb-2">
        <Link to="/">
          <button className="button-bg-default px-4 py-3">ホームに戻る</button></Link>
      </div>
    </div>
  )
};
