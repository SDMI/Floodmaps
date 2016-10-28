using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Activation;
using System.Xml;
using System.ServiceModel.Web;
using Newtonsoft;
using Newtonsoft.Json;
using System.Data;
using System.Net;
using System.IO;

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service" in code, svc and config file together.
[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
public class Service : IService
{


    public string GetElevation(string x, string y, string units, string output)
    {

        string urlBase = "http://ned.usgs.gov/epqs/pqs.php?";
        string urlParams = "x=" + x + "&y=" + y + "&units=" + units + "&output=" + output;
        string requestUrl = urlBase + urlParams;

        ServicePointManager.DefaultConnectionLimit = 100;
        ServicePointManager.Expect100Continue = false;

        try
        {
            HttpWebRequest request = WebRequest.Create(requestUrl) as HttpWebRequest;
            
            // Since our request is coming from this code, rather than from the actual 
            // ajax call itself, a timeout value needs to be set here.

            request.Proxy = null;
            request.Method = "GET";
            request.ContentType = "text/xml";        

            using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
            {
                String responseString = "";
                using (Stream stream = response.GetResponseStream())
                {
                    //Encoding encode = System.Text.Encoding.GetEncoding("utf-8");
                    //StreamReader responseStream = new StreamReader(stream, encode);
                    StreamReader responseStream = new StreamReader(stream);
                    responseString = responseStream.ReadToEnd();
                }
                return responseString;
            }
        }
        catch (Exception e)
        {
            string resultErr = "Service is Unavailable";
            return resultErr;
        }

    }


    //get DOTD CID Contact Information
    public string GetCommunityContact(string CID)
    {
        gov.la.dotd.floods.CommunityContacts ws = new gov.la.dotd.floods.CommunityContacts();
        string result = null; //need to substantiate a null return value
        //TODO: now that you have the connection to the service, use a try/catch and make the call to the DOTD web servcie
        try
        {

            //TODO: Create XML Doc Variable, and Call the DOTD Service with the CID parameter passed from the javascript call to populate it 
            Newtonsoft.Json.Converters.DataSetConverter ds = new Newtonsoft.Json.Converters.DataSetConverter();
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.Converters.Add(ds);
            result = JsonConvert.SerializeObject(ws.GetCommunityInfo(CID), Newtonsoft.Json.Formatting.None, settings);

        }
        catch (Exception e)
        {
            result = "Service is Unavailable"; //TODO: return error
        }
        return result;
    }



    public string GetCommunityContacts(string CID)
    {
        string result = null;

        using (var client = new DOTDCommunityContacts.CommunityContactsSoapClient("CommunityContactsSoap"))
        {
            Newtonsoft.Json.Converters.DataSetConverter ds = new Newtonsoft.Json.Converters.DataSetConverter();
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.Converters.Add(ds);

            result = "not null";
            try
            {
                result = JsonConvert.SerializeObject(client.GetCommunityInfo(CID), Newtonsoft.Json.Formatting.None, settings);
                return result;
            }
            catch (Exception e)
            {
                result = "Service is Unavailable";
                return result;
            }



        }
    }


}
