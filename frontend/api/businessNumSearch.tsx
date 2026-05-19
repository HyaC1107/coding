// App.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const BusinessNumSearch: React.FC = () => {
  const [businessNumber, setBusinessNumber] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = () => {
    fetch('https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=7EwDqJBddRRRfXDpE3Te10UmZi%2BFGvJXYFuUU7IXhR%2F2lVb9A2AEhd0tG16ndELGVYf%2F20rPFyEdZ799DABrxA%3D%3D', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ b_no: [businessNumber] }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSearchResult(data);
      })
      .catch(error => {
        setError('Error fetching data');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>사업자등록번호 검색 및 조회</Text>
      <TextInput
        style={styles.input}
        placeholder="사업자등록번호 검색"
        value={businessNumber}
        onChangeText={text => setBusinessNumber(text)}
      />
      <Button title="검색" onPress={handleSearch} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {searchResult ? (
        <View style={styles.resultContainer}>
          {/* Display search results here */}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
});

export default BusinessNumSearch;
