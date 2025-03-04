import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', store: '' });
  const [filter, setFilter] = useState('all');
  const [sortType, setSortType] = useState(null);

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.store) {
      setProducts([{ ...newProduct, price: parseFloat(newProduct.price), bought: false }, ...products]);
      setNewProduct({ name: '', price: '', store: '' });
    }
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const toggleBought = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      bought: !updatedProducts[index].bought, // Tylko ten produkt, który został kliknięty, zostanie zmodyfikowany
    };
    setProducts(updatedProducts);
  };

  const filterProducts = () => {
    let filtered = [...products];
    if (filter === 'bought') {
      filtered = filtered.filter(product => product.bought);
    } else if (filter === 'notBought') {
      filtered = filtered.filter(product => !product.bought);
    }
    if (sortType === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'store') {
      filtered.sort((a, b) => a.store.localeCompare(b.store));
    }
    return filtered;
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemInfo}>{item.price} zł - {item.store}</Text>
      </View>
      <View style={styles.itemActions}>
        <Button title={item.bought ? "Niekupione" : "Kupione"} onPress={() => toggleBought(index)} />
        <Button title="Usuń" onPress={() => removeProduct(index)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <Button title="Wszystkie" onPress={() => setFilter('all')} />
        <Button title="Kupione" onPress={() => setFilter('bought')} />
        <Button title="Niekupione" onPress={() => setFilter('notBought')} />
        <Button title="Sortuj po cenie" onPress={() => setSortType('price')} />
        <Button title="Sortuj po sklepie" onPress={() => setSortType('store')} />
      </View>

      <FlatList
        data={filterProducts()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nazwa produktu"
          value={newProduct.name}
          onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Cena"
          value={newProduct.price}
          keyboardType="numeric"
          onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Sklep"
          value={newProduct.store}
          onChangeText={(text) => setNewProduct({ ...newProduct, store: text })}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addProduct}>
        <Text style={styles.addButtonText}>Dodaj Produkt</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 20, // Padding for top
    paddingBottom: 20, // Padding for bottom
    paddingHorizontal: 10, // Horizontal padding for all sides
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemInfo: {
    fontSize: 14,
    color: '#555',
  },
  itemActions: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;