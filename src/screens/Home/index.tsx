import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";

import Select from "../../components/Select";

import axios from "../../services/axio";
import * as Styled from "./styles";
import Plant from "./components/Plant";
import Explore from "./components/Explore";

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

interface IPlants {
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

export default function Home() {
  const [environments, setEnvironments] = useState<IEnvironments[] | null>(
    null
  );
  const [selectedEnvironments, setSelectedEnvironments] =
    useState<TypeEnvironmentsKeys>("all");

  const [plants, setPlants] = useState<IPlants[] | null>(null);
  const [filteredPlants, setFilteredPlants] = useState<IPlants[] | null>(null);

  useEffect(() => {
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

  return (
    <ScrollView>
      <Styled.Container>
        <Styled.Title>My Plants</Styled.Title>
        <Styled.Environments>
          <FlatList
            data={environments}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <Select
                title={item.title}
                active={selectedEnvironments === item.key}
                onPress={() => setSelectedEnvironments(item.key)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Styled.Environments>
        <Styled.Plants>
          <FlatList
            data={filteredPlants}
            keyExtractor={(item) => `$plant_id=${item.id}`}
            renderItem={({ item }) => <Plant data={item} />}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </Styled.Plants>
      </Styled.Container>
      <Explore />
    </ScrollView>
  );
}
