using AVSProject.Models;
using MailKit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Threading;
using AVSProject.Interface;
using System;

namespace AVSProject.Controllers
{
    public class MailController
    {
        private readonly IEMailService _mail;

        public MailController(IEMailService mail)
        {
            _mail = mail;
        }

        [HttpPost("sendmail")]
        public async Task<IActionResult> SendMailAsync(MailData mailData)
        {
            bool result = await _mail.SendAsync(mailData, new CancellationToken());

            if (result)
            {
                return StatusCode(StatusCodes.Status200OK, "Mail has successfully been sent.");
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occured. The Mail could not be sent.");
            }
        }

        private IActionResult StatusCode(int status500InternalServerError, string v)
        {
            throw new NotImplementedException();
        }
    }
}
