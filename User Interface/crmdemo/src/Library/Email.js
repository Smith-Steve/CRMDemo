class Email{
    constructor(FlightId, EmailName, EmailSubjectTitle, EmailBody, SendOn, SentAt, EmailNumberInSequence){
        this.FlightId = FlightId
        this.EmailName = EmailName;
        this.EmailSubjectTitle = EmailSubjectTitle;
        this.EmailBody = EmailBody;
        this.SendOn = SendOn;
        this.EmailNumberInSequence = EmailNumberInSequence;
    }
}

export default Email;