import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {

}

const LegsBlock: FC<Props> = () => {
  return (
    <View style={styles.legsBlock}>
      <Text style={styles.legsTitle}>LEGS</Text>
      <View style={styles.legsRow}>
        <Text style={styles.legsPlayer}>Player 1 </Text>
        <Text style={styles.legsScore}>1-0</Text>
        <Text style={styles.legsScore}>3</Text>
      </View>
      <View style={styles.legsRow}>
        <Text style={styles.legsPlayer}>Player 2 </Text>
        <Text style={styles.legsScore}>0-1</Text>
        <Text style={styles.legsScore}>0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legsBlock: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16
  },
  legsTitle: {
    color: "#A6C4B3",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8
  },
  legsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  legsPlayer: {
    color: "#FFFCEB",
    fontSize: 16
  },
  legsScore: {
    color: "#FFFCEB",
    fontSize: 16
  },
});

export default LegsBlock;
