import { useAlert } from "../contexts/AlertContext";

export const Alert = () => {
  const {
    notificationType,
    setNotificationType,
    notificationText,
    setNotificationText,
  } = useAlert();

  function closeNotification() {
    setNotificationType(null);
    setNotificationText("");
  }

  return (
    <>
      {notificationType !== null ? (
        <div id="alert" className="w-[100vw] grid h-[3vh] bg-blue-300 overflow-hidden">
          <p
            style={{ animation: "moveRight 20s linear infinite" }}
            className="font-bold text-center align-middle"
          >
            {" "}
            {notificationText}{" "}
          </p>
          <button
            className="bg-transparent justify-self-end z-[100] absolute py-0 "
            onClick={() => closeNotification()}
          >
            {" "}
            X{" "}
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Alert;
