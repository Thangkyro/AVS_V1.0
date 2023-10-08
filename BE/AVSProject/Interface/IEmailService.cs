using Org.BouncyCastle.Asn1.Pkcs;
using System.Threading.Tasks;
using System.Threading;
using AVSProject.Models;

namespace AVSProject.Interface
{
    public interface IEMailService
    {
        Task<bool> SendAsync(MailData mailData, CancellationToken ct);
    }
}
