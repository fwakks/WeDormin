package com.wedormin.wedormin_backend.service;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wedormin.wedormin_backend.model.Student;



@Service
public class EmbeddingService {
    

    @Autowired
    private EmbeddingModel embeddingModel;

   
    public float[] generateVector(Student student){
        String text = String.format("%s likes: %s dislikes: %s housing_preference: %s",student.getAbout_me(),student.getLikes(),student.getDislikes(), student.getHousing_preference());
        float[] embedding = embeddingModel.embed(text);
        return embedding;
    }

}
