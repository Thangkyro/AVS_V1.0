using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.IO;

namespace AVSProject.Controllers
{
    public class ExportController : ControllerBase
    {
        [NonAction]
        public ActionResult ExportExcel(DataTable data, string nameFile)
        {
            var listData = data;
            using (XLWorkbook wb = new XLWorkbook())
            {
                wb.AddWorksheet(listData, nameFile);
                using (MemoryStream ms = new MemoryStream())
                {
                    wb.SaveAs(ms);
                    return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", nameFile + ".xlsx");
                }
            }
        }
    }
}
