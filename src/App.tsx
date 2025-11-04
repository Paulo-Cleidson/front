import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsuarioForm from "./components/organisms/UsuarioForm";
import CarteiraForm from "./components/organisms/CarteiraForm";
import TransactionForm from "./components/organisms/TransactionForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>
        FinPlan — Controle Financeiro
      </h1>

      <div className="form-container">
        <UsuarioForm />
        <CarteiraForm />
        <TransactionForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
