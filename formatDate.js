// Получение и форматирование даты
export function formatDate() {
    const currentDate = new Date;

    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    let shortYear = year % 100;

    if (date < 10) {
      date = '0' + date
    }
    if (month < 10) {
      month = '0' + month
    }
    if (hours < 10) {
      hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    const formatedTime = `${date}.${month}.${shortYear} ${hours}:${minutes}`;
    return formatedTime;
  };
