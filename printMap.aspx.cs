using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Xml;
using WebShotServices;


public partial class printMap : System.Web.UI.Page
{
    public string tempString = "";

    protected void Page_Load(object sender, EventArgs e)
    {

        XmlDocument xml = new XmlDocument();
        WebShotServices.WebShotService WebShot = new WebShotServices.WebShotService();
       

        try
        {

            // Capture URL from sender
            string url = Request.Url.ToString();

            // ./PrintMap.htm renders the printer friendly map, so replace the aspx with htm, and the web service will take a picture
            //    of the printable map and return it.
            url = url.Replace("aspx", "htm");
            url = url.Replace("localhost", "paco.lsu.edu");
            //Send url to WebShotService at http://gaia.agcenter.lsu.edu/WebShot/webshotservice.asmx
            //consume xml element from web service, First child is the url, so put it in a xml node then extract from innertext

            XmlNode WebShotResult = WebShot.TakeWebShot(url).FirstChild;
            string WebShotResultURL = WebShotResult.InnerText;
            //Return webpage image from xml document and display 
            MapImage.ImageUrl = WebShotResultURL;

        }
        catch (Exception ex)
        {
            Label1.Text = "Service is unavailable";
        }
    }

}