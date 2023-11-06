using AVSProject.EFModel;
using AVSProject.Interface;
using System.Collections.Generic;
using System.Linq;

namespace AVSProject.DataService
{
    public class StaffService : IStaff
    {
        private static db_AVSContext dbcontext = new db_AVSContext();

        public void Delete(int StaffID)
        {
            var user = dbcontext.SStaff.First(x => x.StaffId == StaffID);
            dbcontext.Remove(user);
            dbcontext.SaveChanges();
        }

        public SStaff Get(int StaffID)
        {
            return dbcontext.SStaff.First(x => x.StaffId == StaffID);
        }

        public List<SStaff> GetAllStaff()
        {
            return dbcontext.SStaff.ToList();
        }

        public void Update(SStaff staff)
        {
            var model = dbcontext.Update<SStaff>(staff);
            dbcontext.SaveChanges(true);
        }

        public void Add(SStaff staff)
        {
            var model = dbcontext.Add<SStaff>(staff);
            dbcontext.SaveChanges(true);
        }
    }
}
