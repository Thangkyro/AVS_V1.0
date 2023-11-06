using AVSProject.Common;
using AVSProject.DataService;
using AVSProject.EFModel;
using AVSProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AVSProject.Business
{
    public class ClassBusiness
    {
        private static ClassService classService = new ClassService();
        private static db_AVSContext dataModel = new db_AVSContext();

        public List<ClassModel> GetClass()
        {
            List<ClassModel> listData = new List<ClassModel>();
            var getAllClass = classService.GetAllClass();
            listData = getAllClass.Select(x => new ClassModel()
            {
                ClassID = x.ClassId,
                BranchId = x.BranchId,
                ClassName = x.ClassName,
                ClassCode = x.ClassCode,
                isInActive = x.IsInactive.HasValue ? x.IsInactive.Value : false,
                CreateAt = x.CreatedAt.HasValue ? x.CreatedAt.Value : DateTime.Now,
                CreateBy = x.CreatedBy.HasValue ? x.CreatedBy.Value : 0,
                ModifiedAt = x.ModifiedAt.HasValue ? x.ModifiedAt.Value : DateTime.Now,
                ModifiedBy = x.ModifiedBy.HasValue ? x.ModifiedBy.Value : 0,
                Descriptions = x.Decriptions,
                StartDate = x.StartDate.HasValue ? x.StartDate.Value : DateTime.Now,
                EndDate = x.EndDate.HasValue ? x.EndDate.Value : DateTime.Now,
                Level = x.Level
            }).ToList();
            return listData;
        }

        public ClassModel GetClassByID(int ClassID)
        {
            ClassModel data = new ClassModel();
            var getClass = classService.Get(ClassID);
            if (getClass == null) return new ClassModel();
            data = new ClassModel
            {
                ClassID = getClass.ClassId,
                BranchId = getClass.BranchId,
                ClassName = getClass.ClassName,
                ClassCode = getClass.ClassCode,
                isInActive = getClass.IsInactive.HasValue ? getClass.IsInactive.Value : false,
                CreateAt = getClass.CreatedAt.HasValue ? getClass.CreatedAt.Value : DateTime.Now,
                CreateBy = getClass.CreatedBy.HasValue ? getClass.CreatedBy.Value : 0,
                ModifiedAt = getClass.ModifiedAt.HasValue ? getClass.ModifiedAt.Value : DateTime.Now,
                ModifiedBy = getClass.ModifiedBy.HasValue ? getClass.ModifiedBy.Value : 0,
                Descriptions = getClass.Decriptions,
                StartDate = getClass.StartDate.HasValue ? getClass.StartDate.Value : DateTime.Now,
                EndDate = getClass.EndDate.HasValue ? getClass.EndDate.Value : DateTime.Now,
                Level = getClass.Level

            };
            return data;
        }

        public void UpdateClass(ClassModel Class)
        {
            var check = classService.Get(Class.ClassID);
            var data = new SClass
            {
                ClassId = check.ClassId,
                BranchId = check.BranchId,
                ClassName = check.ClassName,
                ClassCode = check.ClassCode,
                IsInactive = check.IsInactive.HasValue ? check.IsInactive.Value : false,
                CreatedAt = check.CreatedAt.HasValue ? check.CreatedAt.Value : DateTime.Now,
                CreatedBy = check.CreatedBy.HasValue ? check.CreatedBy.Value : 0,
                ModifiedAt = check.ModifiedAt.HasValue ? check.ModifiedAt.Value : DateTime.Now,
                ModifiedBy = check.ModifiedBy.HasValue ? check.ModifiedBy.Value : 0,
                Decriptions = check.Decriptions,
                StartDate = check.StartDate.HasValue ? check.StartDate.Value : DateTime.Now,
                EndDate = check.EndDate.HasValue ? check.EndDate.Value : DateTime.Now,
                Level = check.Level
            };
            if (check == null)
            {
                classService.Add(data);
                return;
            }
            else
            {
                classService.Update(data);
                return;
            }
        }
        public void DeleteClass(int ClassID)
        {
            classService.Delete(ClassID);
        }
    }
}
