using AVSProject.EFModel;
using System.Collections.Generic;

namespace AVSProject.Interface
{
    public interface IUser
    {
        SUser Get(int userID);
        void Add(SUser user);
        void Update(SUser user);
        void Delete(int userID);
        List<SUser> GetAllUser();
    }
}
