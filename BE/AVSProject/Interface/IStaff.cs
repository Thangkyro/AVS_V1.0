using AVSProject.EFModel;
using System.Collections.Generic;

namespace AVSProject.Interface
{
    public interface IStaff
    {
        SStaff Get(int userID);
        void Add(SStaff staff);
        void Update(SStaff staff);
        void Delete(int staffID);
        List<SStaff> GetAllStaff();
    }
}
