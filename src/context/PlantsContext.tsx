import { createContext, useState, useEffect, useContext } from "react";
import axios from "../services/axio";

type TypeEnvironmentsKeys =
  | "all"
  | "living_room"
  | "bedroom"
  | "kitchen"
  | "bathroom";
type TypeEnvironmentsTitle =
  | "All Environments"
  | "Living Room"
  | "Bedroom"
  | "Kitchen"
  | "Bathroom";

interface IEnvironments {
  key: TypeEnvironmentsKeys;
  title: TypeEnvironmentsTitle;
}

export interface IPlants {
  id: number;
  name: string;
  about: string;
  photo: string;
  environments: TypeEnvironmentsKeys[];
  frequency: {
    times: number;
    repeat_every: "day" | "week";
  };
}

interface IPlantsContext {
  environments: IEnvironments[] | null;
  selectedEnvironments: TypeEnvironmentsKeys;
  plants: IPlants[] | null;
  filteredPlants: IPlants[] | null;
  loadingPlants: boolean;
  selectEnvironments: (type: TypeEnvironmentsKeys) => void;
}

interface IPlantsProvider {
  children: React.ReactNode;
}

const plantsContext = createContext({} as IPlantsContext);

export function PlantsProvider({ children }: IPlantsProvider) {
  const [environments, setEnvironments] = useState<IEnvironments[] | null>(
    null
  );
  const [selectedEnvironments, setSelectedEnvironments] =
    useState<TypeEnvironmentsKeys>("all");

  const [plants, setPlants] = useState<IPlants[] | null>(null);
  const [filteredPlants, setFilteredPlants] = useState<IPlants[] | null>(null);

  const [loadingPlants, setLoadingPlants] = useState(true);

  useEffect(() => {
    try {
      async function fetchEnvironments() {
        const response = await axios.get("/plants_environments");
        const data = (await response.data) as IEnvironments[];
        setEnvironments([
          {
            key: "all",
            title: "All Environments",
          },
          ...data,
        ]);
      }

      async function fetchPlants() {
        const response = await axios.get("/plants");
        const data = (await response.data) as IPlants[];
        setPlants(data);
        setFilteredPlants(data);
      }

      fetchEnvironments();
      fetchPlants();
    } catch (error) {
      console.log("Error on PlantsProvider | useEffect");
    } finally {
      setLoadingPlants(false);
    }
  }, []);

  useEffect(() => {
    function searchByEnvironment() {
      if (selectedEnvironments === "all") {
        return setFilteredPlants(plants);
      }

      if (plants !== null && selectedEnvironments !== undefined) {
        const updatedPlants = plants.filter((plant) =>
          plant.environments.includes(selectedEnvironments)
        );

        setFilteredPlants(updatedPlants);
      }
    }

    searchByEnvironment();
  }, [selectedEnvironments]);

  function selectEnvironments(type: TypeEnvironmentsKeys) {
    setSelectedEnvironments(type);
  }

  return (
    <plantsContext.Provider
      value={{
        environments,
        selectedEnvironments,
        plants,
        filteredPlants,
        loadingPlants,
        selectEnvironments,
      }}
    >
      {children}
    </plantsContext.Provider>
  );
}

export function usePlants() {
  const {
    environments,
    selectedEnvironments,
    plants,
    filteredPlants,
    loadingPlants,
    selectEnvironments,
  } = useContext(plantsContext);
  return {
    environments,
    selectedEnvironments,
    plants,
    filteredPlants,
    loadingPlants,
    selectEnvironments,
  };
}
