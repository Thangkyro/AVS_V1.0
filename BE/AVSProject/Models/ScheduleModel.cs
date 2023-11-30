using System;

namespace AVSProject.Models
{
    public class ScheduleModel
    {
        public int ScheduleID { get; set; }
        public string ScheduleName { get; set; }
        public string Descriptions { get; set; }
        public int BranchId { get; set; }
        public int StaffID { get; set; }
        public int ClassID { get; set; }
        public bool isInActive { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public int CreateBy { get; set; }
        public int ModifiedBy { get; set; }
    }
}
