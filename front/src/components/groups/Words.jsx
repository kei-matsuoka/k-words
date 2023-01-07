import { useState, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { Modal } from "../modals/Modal";
import { WarningForm } from "../forms/WarningForm";
import { Word } from "../parts/Word";
import { destroyComment } from "../../apis/comments";
import { destroyWord } from "../../apis/words";
import { PatchWordForm } from "../forms/PatchWordForm";
import { flash_blue, flash_red } from "../../constants";

export const Words = ({
  words,
  handleClickLogin,
  handleFlashMessage,
  handleWords
}) => {

  const { setLoading, isSignedIn } = useContext(AuthContext);
  const [warningModalIsOpen, setWarningModalIsOpen] = useState(false);
  const [patchModalIsOpen, setPatchModalIsOpen] = useState(false);
  const [patchWord, setPatchWord] = useState();
  const [id, setId] = useState(0);
  const [type, setType] = useState("");

  const handleClickPatch = (word) => {
    if (!patchModalIsOpen) {
      setPatchModalIsOpen(true);
      setPatchWord(word);
    } else {
      setPatchModalIsOpen(false);
    }
  };

  const handleWarning = (type, id) => {
    setId(id);
    setType(type);
    setWarningModalIsOpen(warningModalIsOpen ? false : true);
  };

  const handleClickDestroy = async () => {
    try {
      setLoading(true);
      const res = await destroyWord(id);
      if (res?.status === 200) {
        handleWords();
        handleFlashMessage(flash_blue, res.message);
      } else {
        handleFlashMessage(flash_red, res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage(flash_red, e.message);
    }
    setLoading(false);
  };

  const handleCommentDestroy = async () => {
    if (isSignedIn) {
      try {
        const res = await destroyComment(id);
        if (res?.status === 200) {
          handleWords();
          handleFlashMessage(flash_blue, res.message);
        } else {
          handleFlashMessage(flash_red, res.message);
        }
      } catch (e) {
        console.error(e);
        handleFlashMessage(flash_red, e.message);
      }
      setLoading(false);
    } else {
      handleFlashMessage(flash_red, "この機能はログインが必要です");
      handleClickLogin();
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {words.map((word) => <Word
          key={word.id}
          word={word}
          handleClickDestroy={handleClickDestroy}
          handleClickPatch={handleClickPatch}
          handleClickLogin={handleClickLogin}
          handleFlashMessage={handleFlashMessage}
          handleWords={handleWords}
          handleWarning={handleWarning}
        />)}
      </div>
      <Modal
        onClick={handleClickPatch}
        isOpen={patchModalIsOpen}>
        <PatchWordForm
          handleWords={handleWords}
          handleClickPatch={handleClickPatch}
          handleFlashMessage={handleFlashMessage}
          word={patchWord}
        />
      </Modal>
      <Modal onClick={handleWarning} isOpen={warningModalIsOpen}>
        <WarningForm
          handleDestroy={type === "用語" ? handleClickDestroy : handleCommentDestroy}
          handleWarning={handleWarning}
          type={type}
        />
      </Modal>
    </>
  );
}
