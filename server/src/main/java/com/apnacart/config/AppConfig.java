package com.apnacart.config;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
	@Bean
	ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration()
			.setMatchingStrategy(MatchingStrategies.STRICT) // Only map fields that match exactly by name.
			.setPropertyCondition(Conditions.isNotNull()); // Skip null fields so we don’t overwrite existing values with nulls.

		return modelMapper;
	}
}
