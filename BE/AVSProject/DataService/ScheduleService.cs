using AVSProject.EFModel;
using AVSProject.Interface;
using System.Collections.Generic;
using System.Linq;

namespace AVSProject.DataService
{
    public class ScheduleService : ISchedule
    {
        private static db_AVSContext dbcontext = new db_AVSContext();

        public void Delete(int ScheduleID)
        {
            var user = dbcontext.SSchedules.First(x => x.ScheduleId == ScheduleID);
            dbcontext.Remove(user);
            dbcontext.SaveChanges();
        }

        public SSchedule Get(int ScheduleID)
        {
            return dbcontext.SSchedules.First(x => x.ScheduleId == ScheduleID);
        }

        public List<SSchedule> GetAllSchedule()
        {
            return dbcontext.SSchedules.ToList();
        }

        public void Update(SSchedule Schedule)
        {
            var model = dbcontext.Update<SSchedule>(Schedule);
            dbcontext.SaveChanges(true);
        }

        public void Add(SSchedule Schedule)
        {
            var model = dbcontext.Add<SSchedule>(Schedule);
            dbcontext.SaveChanges(true);
        }
    }
}
