package com.customer.service;

import java.util.List;

import com.customer.dto.TranscationRequest;
import com.customer.model.Transcation;

public interface TranscationService {
    Transcation saveTransaction(Transcation transaction);
    List<Transcation> getAllTransactions();
    List<Transcation> getTransactionsByBookingId(Long bookingId);
	Transcation saveTransaction(TranscationRequest request);
}
