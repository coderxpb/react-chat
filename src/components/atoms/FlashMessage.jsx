import localClasses from "./flashmessage.module.scss";

const FlashMessage = ({ status }) => {
  return (
    <div className={localClasses.flashmessage}>
      <strong
        className={
          status.status
            ? `${localClasses.status} ${localClasses.statusSuccess}`
            : `${localClasses.status} ${localClasses.statusFailure}`
        }
      >
        {status.value}
      </strong>
    </div>
  );
};

export default FlashMessage;
