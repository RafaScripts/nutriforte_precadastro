import {useState, useEffect} from "react";
import logo from './assets/logo.png';
import './App.css';
import {cpfOrCnpj, formatPhone, TestaCPF, validarCNPJ} from "./helpers/formater";
import api from "./services/api";
import moment from "moment";

function App() {
  const [doc, setDoc] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [instagram, setInstagram] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isNewsletter, setIsNewsletter] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(isSeller)
  }, [isSeller]);

  async function submit(){
    //console.log(doc.length)
    let clearDoc = doc.replace(/\D/g, '');
    if(clearDoc.length === 11){
      console.log('cpf')
      let test = TestaCPF(clearDoc);
      console.log(test)
      if(!test){
        alert('CPF invalido')
        return;
      }
    }else{
      console.log('cnpj')
      let test = validarCNPJ(doc);
      console.log(test)
      if(!test){
        alert('CNPJ invalido')
        return;
      }
    }

    if(!name || !doc || !email || !phone || !birth || !instagram){
      alert('Preencha todos os campos')
      return;
    }

    const mensage = {
      "number": "5577998550588", //"5577991716934",
      "text": `*NOVO PRÉ-CADASTRO*\n\n*Nome:* ${name}\n*CPF/CNPJ:* ${doc}\n*Email:* ${email}\n*Telefone:* ${phone}\n*link Conversa Direto:* https://wa.me/+55${phone.replace(/\D/g, '')}\n*Data de nascimento:* ${moment(birth).format("DD/MM/YYYY")}\n*Instagram:* ${instagram}\n*Vendedor:* ${isSeller ? "*SIM*" : "*NÃO*"}\n*Novidades e Promoções:* ${isNewsletter ? "*SIM QUERO RECEBER*" : "*NÃO QUERO*"}\n`
    }

    setLoading(true);
    try{
      await api.post('/api/v1/whatsapp/sendText', mensage, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3BsYXRhZm9ybWEuYXBpYnJhc2lsLmNvbS5ici9hdXRoL2xvZ2luIiwiaWF0IjoxNjc2NDM0ODAzLCJleHAiOjE3MDc5NzA4MDMsIm5iZiI6MTY3NjQzNDgwMywianRpIjoiM0xGSkt3UVVrRkpVODBTdyIsInN1YiI6IjQ1MiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.IGTWpohJfJCr7j7T2x5kzdsFRuV-eTqCrw6dwZDxsko',
          'SecretKey': 'e3b0e4b8-7670-47b6-8543-47f869ccc90e',
          'PublicToken': 'Gratis-LJZyLJzCGpLzGlZx253Z',
          'DeviceToken': 'cc8ae6f5-bb1c-4a24-b10c-a5bcbd159961'
        }
      }).then((res) => {
        console.log(res.data)
        setTimeout(() => {
          window.location.href = 'https://bit.ly/distribuidoranutriforte';
        }, 1000)
      }).catch((err) => {
        console.log(err)
        setTimeout(() => {
          alert('Ocorreu um erro, tente novamente...');
          window.location.reload();
        }, 1000);
      });
    }catch (e) {
      console.log(e)
    }finally {
      setLoading(false);
    }


    //let teste = TestaCPF();
  }

  return (
    <div className="App">
      <head>
        <script async src="https://lucas-analitycs.5bglhd.easypanel.host/script.js" data-website-id="3cd6e779-31ea-4b32-99f5-cb14134fcb98"></script>
      </head>
      <img style={{width: '230px'}} src={logo}/>
      <h1>Pré Cadastro</h1>
      <span style={{margin: '10px 0'}}>Ola, antes de continuar e ver nosso catalago de produtos, faça seu pre-cadastro, todas as suas <br/>informações estarão protegidas e você terá maior comodidade em suas compras conosco.
        <br/><br/><span style={{fontWeight: 'bold'}}>Bem vindo a familia NutriForte!!!</span></span>

      <div className={"form"}>
        <label>CPF / CNPJ</label>
        <input value={doc} maxLength={18} onChange={(e) => setDoc(cpfOrCnpj(e))} placeholder={"CPF/CNPJ"}/>
        <label>Nome Completo</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={"Nome Completo"}/>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Email"}/>
        <label>Celular / Whatsapp</label>
        <input value={phone} onChange={(e) => setPhone(formatPhone(e))} maxLength={15} placeholder={"Celular / Whatsapp"}/>
        <label>Data de Nascimento</label>
        <input value={birth} onChange={(e) => setBirth(e.target.value)} type={'date'} placeholder={"Data de Nascimento"}/>
        <label>Instagram</label>
        <input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder={"Instagram ex: @nutrifortevca"}/>
        <div className={"divSwitchs"}>
          <div style={{margin: '10px 0'}}>
            <label className="switch">
              <input onChange={(e) => setIsSeller(!isSeller)} type="checkbox"/>
              <span className="slider round"></span>
            </label>
            <span style={{marginLeft: '10px', fontSize: '12px'}}>Faz venda de produtos ?</span>
          </div>
          <div>
            <label className="switch">
              <input onChange={(e) => setIsNewsletter(!isNewsletter)} type="checkbox"/>
              <span className="slider round"></span>
            </label>
            <span style={{marginLeft: '10px', fontSize: '12px'}}>Eu aceito receber novidades e promoções da NutriForte</span>
          </div>
        </div>
        <button disabled={loading} onClick={() => submit()}>{loading ? <span className="loader"></span> : "Enviar"}</button>
      </div>
    </div>
  );
}

export default App;
