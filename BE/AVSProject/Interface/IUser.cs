using AVSProject.model;
using AVSProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
