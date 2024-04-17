import { FlatList, ScrollView } from "react-native";
import { usePlants } from "../../context/PlantsContext";

import Select from "../../components/Select";
import Plant from "./components/Plant";

import * as Styled from "./styles";

export default function Home() {
  const {
    environments,
    selectedEnvironments,
    filteredPlants,
    loadingPlants,
    selectEnvironments,
  } = usePlants();

  if (loadingPlants) {
    return null;
  }

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
                onPress={() => selectEnvironments(item.key)}
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
    </ScrollView>
  );
}
