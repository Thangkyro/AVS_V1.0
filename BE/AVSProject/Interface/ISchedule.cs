using AVSProject.EFModel;
using System.Collections.Generic;

namespace AVSProject.Interface
{
    public interface ISchedule
    {
        SSchedule Get(int userID);
        void Add(SSchedule Schedule);
        void Update(SSchedule Schedule);
        void Delete(int ScheduleID);
        List<SSchedule> GetAllSchedule();
    }
}
