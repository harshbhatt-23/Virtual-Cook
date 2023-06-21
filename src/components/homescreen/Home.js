import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View } from "react-native";

const Home = ({ language }) => {
  return (
    <Text style={styles.container}></Text>
  )
};

const mapStateToProps = (state) => ({
  language: state.language,
});

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  }
});

export default connect(mapStateToProps)(Home);