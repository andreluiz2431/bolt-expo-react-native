import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { TrainingType } from '@/types';
import { Button } from '../ui/Button';
import { SelectDropdown } from '../ui/SelectDropdown';

interface EditTrainingModalProps {
  visible: boolean;
  training: any;
  onClose: () => void;
  onSave: (updated: any) => void;
}

const types: TrainingType[] = ['Normal', 'Tiro', 'Regenerativo', 'Longo', 'Competição'];

export const EditTrainingModal = ({ visible, training, onClose, onSave }: EditTrainingModalProps) => {
  const [type, setType] = useState<TrainingType>('Normal');
  const [distance, setDistance] = useState('');
  const [pace, setPace] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (training) {
      setType(training.type || 'Normal');
      setDistance(training.distance || '');
      setPace(training.pace || '');
      setNotes(training.notes || '');
    }
  }, [training]);

  const handleSave = () => {
    onSave({
      ...training,
      type,
      distance,
      pace,
      notes,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Editar Treino</Text>
          <SelectDropdown data={types} selected={type} onSelect={setType} placeholder="Tipo" />
          <TextInput
            placeholder="Distância (km)"
            style={styles.input}
            value={distance}
            onChangeText={setDistance}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Pace (min/km)"
            style={styles.input}
            value={pace}
            onChangeText={setPace}
          />
          <TextInput
            placeholder="Observações"
            style={[styles.input, { height: 80 }]}
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <Button title="Salvar" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelBtn: {
    padding: 8,
  },
  cancelText: {
    color: 'red',
    fontSize: 14,
  },
});