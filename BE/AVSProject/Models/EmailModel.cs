using System.Collections.Generic;

namespace AVSProject.Models
{
    public class EmailSetting
    {
        public string DisplayName { get; set; }
        public  string   From { get; set; }
        public string Host { get; set; }
        public string Password { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; }
        public bool UseSSL { get; set; }
        public bool UseStartTls { get; set; }
    }

    public class MailData
    {
        // Receiver
        public List<string> To { get; set; }
        public List<string> Bcc { get; set; }

        public List<string> Cc { get; set; }

        // Sender
        public string From { get; set; }

        //public string DisplayName { get; set; }

        //public string ReplyTo { get; set; }

        //public  string ReplyToName { get; set; }

        // Content
        //public string Subject { get; set; }

        //public string Body { get; set; }
    }
}
