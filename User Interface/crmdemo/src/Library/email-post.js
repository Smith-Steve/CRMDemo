export default class Email {
    constructor(EmailId, FlightId, EmailName, EmailSubjetTitle, EmailBody, SendOn, CreatedAt, SentAt, EmailNumberInSequence){
        this.EmailId = EmailId;
        this.FlightId = FlightId;
        this.EmailName = EmailName;
        this.EmailSubjetTitle = EmailSubjetTitle;
        this.EmailBody = EmailBody;
        this.SendOn = SendOn;
        this.CreatedAt = CreatedAt;
        this.SentAt = SentAt;
        this.EmailNumberInSequence = EmailNumberInSequence;
    }
}