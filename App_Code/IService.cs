using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Net;
using System.Web.Script.Services;
using System.ServiceModel.Web;
using System.Collections.Specialized;
using System.ServiceModel.Activation;



// NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService" in both code and config file together.

[ServiceContract]
public interface IService
{
    //Service Contract for DOTD Community Contacts
    [OperationContract]
    [WebInvoke(Method = "GET",
    ResponseFormat = WebMessageFormat.Json)]
    string GetCommunityContact(string CID);

    //Service Contract for Test Method
    [OperationContract]
    [WebInvoke(Method = "GET",
    ResponseFormat = WebMessageFormat.Json)]
    string GetElevation(string x, string y, string units, string output);


    //Service Contract for DOTD Community Contacts
    [OperationContract]
    [WebInvoke(Method = "GET",
        ResponseFormat = WebMessageFormat.Json)]
    string GetCommunityContacts(string CID);
}

