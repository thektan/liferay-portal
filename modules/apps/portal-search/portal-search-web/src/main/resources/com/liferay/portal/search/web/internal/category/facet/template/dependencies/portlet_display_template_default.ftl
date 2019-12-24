<div class="display-default">
	<ul>
		<#if entries?has_content>
			<#list entries as entry>
				<li class="facet-value tag-popularity-${entry.getPopularity()}">
					<div class="custom-checkbox custom-control">
						<label class="facet-checkbox-label" for="<portlet:namespace />term_0">
							<input class="custom-control-input facet-term" data-term-id="${entry.getAssetCategoryId()}" id="<portlet:namespace />term_0" name="<portlet:namespace />term_0" onChange="Liferay.Search.FacetUtil.changeSelection(event);" type="checkbox" ${(entry.isSelected())?then("checked","")} />

							<span class="custom-control-label term-name ${(entry.isSelected())?then('facet-term-selected','facet-term-unselected')}">
							<span class="custom-control-label-text">${htmlUtil.escape(entry.getDisplayName())}</span>
							</span>

							<#if entry.isFrequencyVisible()>
								<small class="term-count">
									(${entry.getFrequency()})
								</small>
							</#if>
						</label>
					</div>
				</li>
			</#list>
		</#if>
	</ul>
</div>