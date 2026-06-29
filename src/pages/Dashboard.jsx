import { ActionCard } from "../assets/shared/ActionCard";
import { BandasPanel } from "../assets/dashboard/BandasPanel";
import { MusicosPanel } from "../assets/dashboard/MusicosPanel";
import { SalasPanel } from "../assets/dashboard/SalasPanel";
import { MarketplacePanel } from "../assets/dashboard/MarketplacePanel";

const ACTIONS = {
  BANDAS: 'bandas',
  MUSICOS: 'musicos',
  SALAS: 'salas',
  MARKETPLACE: 'marketplace'
};

export const Dashboard = () => {
  const { profile, logout } = useAuth();
  const [activeAction, setActiveAction] = useState(null);

  const renderPanel = () => {
    switch(activeAction) {
      case ACTIONS.BANDAS:
        return <BandasPanel />;
      case ACTIONS.MUSICOS:
        return <MusicosPanel />;
      case ACTIONS.SALAS:
        return <SalasPanel />;
      case ACTIONS.MARKETPLACE:
        return <MarketplacePanel />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-[#1a1a1a] p-8 rounded-3xl flex items-center gap-6 border border-white/5">
        <img 
          src={profile.avatar || "https://api.dicebear.com/7.x/pixel-art/svg?seed=rock"} 
          alt={profile.username}
          className="w-20 h-20 rounded-full bg-white"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-black">{profile.username}</h1>
          <p className="text-slate-400">{profile.fullName}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
              {profile.role === 'musician' ? '🎸 Músico' : 
               profile.role === 'business' ? '🏢 Negocio' : '🎵 Público'}
            </span>
            {profile.location && (
              <span className="text-xs bg-white/10 text-slate-400 px-2 py-1 rounded-full">
                📍 {profile.location}
              </span>
            )}
          </div>
        </div>
        <button 
          onClick={logout} 
          className="text-xs text-red-500 hover:text-red-400 underline transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

      {activeAction ? (
        <>
          <button 
            onClick={() => setActiveAction(null)} 
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={16}/> Volver al Dashboard
          </button>
          {renderPanel()}
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-slate-400">Explorar Ecosistema</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionCard 
              title="Mis Bandas" 
              icon="Users" 
              description="Crea o gestiona tu proyecto" 
              color="purple" 
              onClick={() => setActiveAction(ACTIONS.BANDAS)} 
            />
            <ActionCard 
              title="Buscar Músicos" 
              icon="Search" 
              description="Encuentra tu próximo integrante" 
              color="purple" 
              onClick={() => setActiveAction(ACTIONS.MUSICOS)} 
            />
            <ActionCard 
              title="Salas y Estudios" 
              icon="Music" 
              description="Reserva tu lugar de ensayo" 
              color="purple" 
              onClick={() => setActiveAction(ACTIONS.SALAS)} 
            />
            <ActionCard 
              title="Marketplace" 
              icon="ShoppingBag" 
              description="Compra/Vende equipo" 
              color="purple" 
              onClick={() => setActiveAction(ACTIONS.MARKETPLACE)} 
            />
          </div>
        </>
      )}
    </div>
  );
};