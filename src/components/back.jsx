import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient' // import LinearGradient

function Back() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['red', 'yellow', 'green' ]}
          style={styles.linearGradient}
        >
          <Text>Vertical Gradient</Text>
        </LinearGradient>
      </View>
    )
}
export default Back;