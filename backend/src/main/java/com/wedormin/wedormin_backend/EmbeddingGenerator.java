package com.wedormin.wedormin_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.postgresql.util.PGobject;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.simple.JdbcClient;

import java.sql.SQLException;

@Component
public class EmbeddingGenerator  implements CommandLineRunner{

    @Autowired
    private JdbcClient jdbcClient;

    @Autowired
    private EmbeddingModel embeddingModel;

    public void generate() {
        SqlRowSet result = jdbcClient.sql("SELECT ruid, about_me, likes, dislikes, housing_preference FROM student;")
                                     .query()
                                     .rowSet();
    
        while (result.next()) {
            long ruid = result.getLong("ruid");
            String about_me = result.getString("about_me");
            String likes = result.getString("likes");
            String dislikes = result.getString("dislikes");
            String housing_preference = result.getString("housing_preference");
    
            String text = about_me + " " + likes + " dislikes: " + dislikes + " housing_preference: " + housing_preference;
            float[] embedding = embeddingModel.embed(text);
            PGobject embed = convertToDatabaseColumn(embedding);
    
            // System.out.println("ruid: " + ruid + " " + text);
            // System.out.println(embed);
    
            jdbcClient.sql("UPDATE student SET embedding = :embedding WHERE ruid = :ruid;")
                      .param("embedding", embed)  // Convert float[] to string for pgvector
                      .param("ruid", ruid)  // Fix parameter name
                      .update();
    
            // System.out.println(ruid + " " + embed);
            // break;
        }
    }

  

public PGobject convertToDatabaseColumn(float[] vector) {
    if (vector == null) return null;
    PGobject pgObject = new PGobject();
    pgObject.setType("vector");
    try {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < vector.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(vector[i]);
        }
        sb.append("]");

        pgObject.setValue(sb.toString());
    } catch (SQLException e) {
        throw new RuntimeException("Error converting float[] to PGobject", e);
    }
    return pgObject;
}


    @Override
    public void run(String... args) throws Exception{
        generate();
    }


}
