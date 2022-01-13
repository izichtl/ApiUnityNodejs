using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.Networking;

public class LoginManager : MonoBehaviour
{
	private const string Login = "Ivan";
	private const string Pass = "1234";
    
    [SerializeField]
	private InputField usuarioField = null;
    [SerializeField]
    private InputField senhaField = null;
    [SerializeField]
    private Text feedbackmsg = null;
	
    [SerializeField]
    private InputField retornomsg = null;
    [SerializeField]
    private Toggle rememberData = null;

    private bool validation = false;
    private bool consoleControl = true;
	private string url = "http://localhost:8080/login";

	void Start () {
		if ( PlayerPrefs.HasKey ("remember") && PlayerPrefs.GetInt ("remember") == 1) {
			usuarioField.text = PlayerPrefs.GetString("rememberLogin");
			senhaField.text = PlayerPrefs.GetString("rememberPass");
		}
		StartCoroutine(DashDot());
	}
	public void FazerLogin () {
		consoleControl = false;
		
		if (usuarioField.text == "" || senhaField.text == "") {
			FeedBackError("Preencha os campos");
		} else {
			string usuario = usuarioField.text;
			string senha = senhaField.text;
			if (rememberData.isOn) {
				PlayerPrefs.SetInt("remember", 1);
				PlayerPrefs.SetString("rememberLogin", usuario);
				PlayerPrefs.SetString("rememberPass", senha);
			}
			// if ( usuario == Login && senha == Pass) {
			// 	FeedBackOk("Login realizado com sucesso\nAguarde");
        	//     StartCoroutine(CarregaScene());
			// } else {
			// 	FeedBackError("Errorrrrr");
			// }
			// print ("ERRROR");
			string str = $"{url}/{usuario}/{senha}";
			// string teste = url + "/" + usuario + "/" + senha;
			// print (str);
			// WWW www = new WWW (url);
			StartCoroutine(postRequest(str));
		}

	}

	public void UpdateList() {
		consoleControl = false;
		StartCoroutine(getRequest(url));
	}

	IEnumerator postRequest(string uri) {
		UnityWebRequest uwr = UnityWebRequest.Get(uri);
		yield return uwr.SendWebRequest();
		if (uwr.isNetworkError)
    	{
        	retornomsg.text = "error";
    	}
    	else
    	{
			if (uwr.downloadHandler.text == "1") {
				StartCoroutine(CarregaScene());
				retornomsg.text = "Login realizado, carregando ambiente\nAguarde";
			} else {
				retornomsg.text = uwr.downloadHandler.text; // "Login realizado, carregando ambiente\nAguarde";
			}
    	}
	}

	IEnumerator getRequest(string uri) {
		UnityWebRequest uwr = UnityWebRequest.Get(uri);
		yield return uwr.SendWebRequest();
		if (uwr.isNetworkError)
    	{
        	Debug.Log("Error While Sending: " + uwr.error);
    	}
    	else
    	{
        	retornomsg.text = uwr.downloadHandler.text;
			// Debug.Log(uwr.downloadHandler.text);
    	}
	}

	IEnumerator CarregaScene() {
		yield return new WaitForSeconds(2);
		retornomsg.text = "Iniciando Ambiente\nObrigado por usar a Beta";
		yield return new WaitForSeconds(3);
		Application.LoadLevel ("modelo_camera");
		
	}

	IEnumerator DashDot() {
		yield return new WaitForSeconds(1);
		if (validation) {
			
			validation = false;
			if (consoleControl) { 
				retornomsg.text = "_";
				StartCoroutine(DashDot());
			}
		} else {
			validation = true;
			if (consoleControl) { 
				retornomsg.text = ".";
				StartCoroutine(DashDot());
			}
		}
		
	}
    void FeedBackError (string msg) {
		feedbackmsg.CrossFadeAlpha (100f, 0f, false);
		feedbackmsg.color = Color.red;
		feedbackmsg.text = msg;
		feedbackmsg.CrossFadeAlpha (0f, 2f, false);
		usuarioField.text = "";
		senhaField.text = "";
	}
    void FeedBackOk (string msg) {
		feedbackmsg.CrossFadeAlpha (100f, 0f, false);
			feedbackmsg.color = Color.blue;
			feedbackmsg.text = msg;
	}
    public void ClearConsole () {
		consoleControl = true;
		StartCoroutine(DashDot());
	}

}
