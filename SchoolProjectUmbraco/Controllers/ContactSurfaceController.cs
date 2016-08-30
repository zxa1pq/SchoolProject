using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Web.Mvc;
using System.Web.Mvc;
using SchoolProjectUmbraco.Models;
using System.Xml.XPath;

namespace SchoolProjectUmbraco.Controllers
{
    public class ContactSurfaceController : SurfaceController
    {

        public ActionResult ShowForm()
        {

            ContactModel myModel = new ContactModel();
            List<SelectListItem> ListOfGenders = new List<SelectListItem>();
            XPathNodeIterator iterator = umbraco.library.GetPreValues(1103);
            iterator.MoveNext();
            XPathNodeIterator preValues = iterator.Current.SelectChildren("preValue", "");
            while (preValues.MoveNext())
            {
                string preValue = preValues.Current.Value;
                ListOfGenders.Add(new SelectListItem
                {
                    Text = preValue,
                    Value = preValue
                });
                myModel.ListOfGenders = ListOfGenders;

            }

            return PartialView("ContactForm", myModel);
        }



        public ActionResult HandleFormPost(ContactModel model)
        {

            var newComment = Services.ContentService.CreateContent(model.Name + "-" + DateTime.Now, CurrentPage.Id,"contactForm");
            var myService = ApplicationContext.Services.DataTypeService;
            var SelectedGender = myService.GetAllDataTypeDefinitions().First(x => x.Id == 1103);
            int SelectedGenderPreValueId = myService.GetPreValuesCollectionByDataTypeId(SelectedGender.Id).PreValuesAsDictionary.Where(x => x.Value.Value == model.SelectedGender).Select(x => x.Value.Id).First();

            newComment.SetValue("emailFrom", model.Email);
            newComment.SetValue("contactName", model.Name);
            newComment.SetValue("dropdownGender", SelectedGenderPreValueId);
            newComment.SetValue("contactMessage", model.Message);
            newComment.SetValue("UmbracoNaviHide", true);

            Services.ContentService.SaveAndPublishWithStatus(newComment);
            return RedirectToUmbracoPage(1058);
        }


}

   
}