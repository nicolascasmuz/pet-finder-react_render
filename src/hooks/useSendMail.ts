import { API_BASE_URL } from "../API_BASE_URL";

function useSendMail() {
  async function sendMail(mail) {
    await fetch(API_BASE_URL + "/send-mail", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(mail),
    });
  }

  return sendMail;
}

export { useSendMail };
