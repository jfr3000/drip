import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'

import styles, { iconStyles } from '../../styles'
import Icon from 'react-native-vector-icons/AntDesign'
import NavigationArrow from './navigation-arrow'
import formatDate from '../helpers/format-date'

SymptomViewHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  goBack: PropTypes.func,
  deleteIconActive: PropTypes.bool,
  onDelete: PropTypes.func,
}

export default function SymptomViewHeader(props) {
  const { goBack, title, date, shouldShowDelete, onDelete } = props
  const middle = Dimensions.get('window').width / 2
  return (
    <View style={[styles.header, styles.headerCycleDay, styles.headerSymptom]}>
      <View
        style={styles.accentCircle}
        left={middle - styles.accentCircle.width / 2}
      />
      <NavigationArrow direction='left' goBack={goBack} />
      <View>
        <Text style={styles.dateHeader} testID='symptomViewTitleName'>
          {title}
        </Text>
        { date &&
          <Text style={styles.cycleDayNumber} testID='symptomViewTitleDate'>
            {formatDate(date)}
          </Text>
        }
      </View >
      { shouldShowDelete && <DeleteButton onDelete={onDelete} />}
    </View>
  )
}

const DeleteButton = ({ onDelete }) => {
  return (
    <TouchableOpacity onPress={onDelete} style={styles.headerDeleteButton}>
      <Icon name="delete" {...iconStyles.symptomHeaderIcons} />
    </TouchableOpacity>
  )
}
