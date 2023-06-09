export default class Email {
    constructor(EmailId, FlightId, emailNumberInSequence, EmailName, EmailSubjetTitle, EmailBody, SendOn = null, CreatedAt = null, SentAt = null){
        this.EmailId = EmailId;
        this.FlightId = FlightId;
        this.emailNumberInSequence = emailNumberInSequence;
        this.EmailName = EmailName;
        this.EmailSubjetTitle = EmailSubjetTitle;
        this.EmailBody = EmailBody;
        this.SendOn = SendOn;
        this.CreatedAt = CreatedAt;
        this.sentAt = sentAt;
    }
}