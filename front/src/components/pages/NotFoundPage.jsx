import { useEffect } from "react";
import { Link } from "react-router-dom"

export const NotFoundPage = ({ setTitle }) => {
  useEffect(() => {
    setTitle("ページが見つかりません")
  }, []);
  return (
    <>
      <p className="text-sm">お探しのページは存在しないか、移動または削除された可能性があります。</p><br/>
      <div className="flex justify-center">
        <Link to="/"><button className="bg-gray-800 hover:bg-gray-600 px-4 py-3 rounded text-white duration-300">ホームに戻る</button></Link>
      </div>
    </>
  )
}
