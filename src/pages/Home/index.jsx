import { useState } from "react";
import { apiViaCep } from "../../services/apiViaCep";

const Home = () => {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);

  const handleFindAddress = async () => {
    setLoading(true);

    try {
      const { data } = await apiViaCep.get(`${cep}/json`);
      setAddress(data);
    } catch (error) {
      alert("CEP não encontrado.");
    } finally {
      setLoading(false);
    }
  };

  console.log(address);

  return (
    <main>
      <label htmlFor="cep">Insira seu cep:</label>
      <input
        type="text"
        name="cep"
        placeholder="00000-00"
        onChange={(e) => setCep(e.target.value)}
      />
      <button disabled={loading === true} onClick={handleFindAddress}>
        Buscar
      </button>

      {address && (
        <div>
          <input type="text" value={address.logradouro} readOnly />
          <input type="text" value={address.bairro} readOnly />
          <input type="text" value={address.localidade} readOnly />
          <input type="text" value={address.uf} readOnly />
          <label htmlFor="complemento">Complemento:</label>
          <input type="text" placeholder="Apto 6, bloco 2" required />
        </div>
      )}
    </main>
  );
};

export default Home;
