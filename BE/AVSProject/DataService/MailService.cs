using AVSProject.EFModel;
using AVSProject.Interface;
using AVSProject.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace AVSProject.DataService
{
    public class MailService : IEMailService
    {
        private readonly EmailSetting _settings;
        private static db_AVSContext dbcontext = new db_AVSContext();
        public MailService(IOptions<EmailSetting> settings)
        {
            this._settings = settings.Value;
        }
        public async Task<bool> SendAsync(MailData mailData, CancellationToken ct = default)
        {
            try
            {
                // Initialize a new instance of the MimeKit.MimeMessage class
                var mail = new MimeMessage();

                #region Sender / Receiver
                // Sender
                mail.From.Add(new MailboxAddress(_settings.DisplayName, _settings.From));

                // Receiver
                foreach (string mailAddress in mailData.Email)
                    mail.To.Add(MailboxAddress.Parse(mailAddress));

                // Set Reply to if specified in mail data
                //if (!string.IsNullOrEmpty(mailData.ReplyTo))
                //    mail.ReplyTo.Add(new MailboxAddress(mailData.ReplyToName, mailData.ReplyTo));

                // BCC
                // Check if a BCC was supplied in the request
                //if (mailData.Bcc != null)
                //{
                //    // Get only addresses where value is not null or with whitespace. x = value of address
                //    foreach (string mailAddress in mailData.Bcc.Where(x => !string.IsNullOrWhiteSpace(x)))
                //        mail.Bcc.Add(MailboxAddress.Parse(mailAddress.Trim()));
                //}

                // CC
                // Check if a CC address was supplied in the request
                //if (mailData.Cc != null)
                //{
                //    foreach (string mailAddress in mailData.Cc.Where(x => !string.IsNullOrWhiteSpace(x)))
                //        mail.Cc.Add(MailboxAddress.Parse(mailAddress.Trim()));
                //}
                #endregion

                #region Content
                byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
                byte[] key = GetBytes(mailData.Email.First());
                string token = Convert.ToBase64String(time.Concat(key).ToArray());

                // Add Content to Mime Message
                var body = new BodyBuilder();
                mail.Subject = "Reset your password";
                body.HtmlBody = String.Format("No need to worry, you can reset your AVS Managerment System password by clicking the link below: <a href='https://avs-v1-0.vercel.app/password-reset?token={0}'>Reset your password</a>", token);

                mail.Body = body.ToMessageBody();
                #endregion

                #region Send Mail                                
                using var smtp = new SmtpClient();

                if (_settings.UseSSL)
                {
                    await smtp.ConnectAsync(_settings.Host, _settings.Port, SecureSocketOptions.SslOnConnect, ct);
                }
                else if (_settings.UseStartTls)
                {
                    await smtp.ConnectAsync(_settings.Host, _settings.Port, SecureSocketOptions.StartTls, ct);
                }
                await smtp.AuthenticateAsync(_settings.From, _settings.Password, ct);
                await smtp.SendAsync(mail, ct);
                await smtp.DisconnectAsync(true, ct);

                #endregion

                return true;

            }
            catch (Exception)
            {
                return false;
            }
        }
        private static byte[] GetBytes(string reason) => Encoding.ASCII.GetBytes(reason);


    }
}
